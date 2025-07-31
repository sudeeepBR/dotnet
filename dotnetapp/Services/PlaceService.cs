using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class PlaceService
    {
        private readonly ApplicationDbContext _context;

        public PlaceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Place>> GetAllPlaces()
        {
            return await _context.Places.ToListAsync();
        }

        public async Task<Place?> GetPlaceById(int placeId)
        {
            return await _context.Places.FindAsync(placeId);
        }

        public async Task<bool> AddPlace(Place place)
        {
            try
            {
                // Recalculate the next available PlaceId
                var existingPlaces = await _context.Places.ToListAsync();
                var maxPlaceId = existingPlaces.Any() ? existingPlaces.Max(p => p.PlaceId) : 0;
                var availablePlaceIds = Enumerable.Range(1, maxPlaceId + 1).Except(existingPlaces.Select(p => p.PlaceId)).ToList();

                place.PlaceId = availablePlaceIds.Any() ? availablePlaceIds.First() : 1; // Start from 1 if no places exist

                if (_context.Places.Any(p => p.Name == place.Name && p.Location == place.Location))
                {
                    throw new Exception("A place with the same name and location already exists.");
                }

                _context.Places.Add(place);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException dbEx)
            {
                // Log the detailed database error
                throw new Exception("Database error: " + dbEx.InnerException?.Message ?? dbEx.Message, dbEx);
            }
            catch (Exception ex)
            {
                // Log the general error
                throw new Exception("Error adding place: " + ex.Message, ex);
            }
        }

        public async Task<bool> UpdatePlace(int placeId, Place place)
        {
            try
            {
                var existingPlace = await _context.Places.FindAsync(placeId);
                if (existingPlace == null)
                    return false;

                existingPlace.Name = place.Name;
                existingPlace.Category = place.Category;
                existingPlace.BestTimeToVisit = place.BestTimeToVisit;
                existingPlace.PlaceImage = place.PlaceImage;
                existingPlace.Location = place.Location;

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log or return the exception details
                throw new Exception("Error updating place: " + ex.Message, ex);
            }
        }

        public async Task<bool> DeletePlace(int placeId)
        {
            try
            {
                var place = await _context.Places.FindAsync(placeId);
                if (place == null)
                    return false;

                _context.Places.Remove(place);
                await _context.SaveChangesAsync();

                // Check if Places table is empty, then reset identity seed
                if (!await _context.Places.AnyAsync())
                {
                    await _context.ResetPlacesIdentityAsync();
                }

                return true;
            }
            catch (Exception ex)
            {
                // Log or return the exception details
                throw new Exception("Error deleting place: " + ex.Message, ex);
            }
        }
    }
}
