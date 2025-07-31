using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/place")]
    //[Authorize(Roles = "Guide")] // Only Guides can access by default
    public class PlaceController : ControllerBase
    {
        private readonly PlaceService _placeService;

        public PlaceController(PlaceService placeService)
        {
            _placeService = placeService;
        }

        // 1. Get All Places
        [HttpGet]
        [AllowAnonymous] // Or use: [Authorize(Roles = "Guide,Traveller")]
        public async Task<ActionResult<IEnumerable<Place>>> GetAllPlaces()
        {
            var places = await _placeService.GetAllPlaces();
            return Ok(places);
        }

        // 2. Get Place by ID
        [HttpGet("{placeId}")]
        [AllowAnonymous] // Or use: [Authorize(Roles = "Guide,Traveller")]
        public async Task<ActionResult<Place>> GetPlaceById(int placeId)
        {
            var place = await _placeService.GetPlaceById(placeId);
            if (place == null)
                return NotFound(new { Message = "Cannot find any place" });

            return Ok(place);
        }

        // 3. Add Place
        [HttpPost]
        [Authorize(Roles = "Guide")]
        public async Task<ActionResult> AddPlace([FromBody] Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid input", Errors = ModelState });
            }

            try
            {
                var success = await _placeService.AddPlace(place);
                if (success)
                    return Ok(new { Message = "Place added successfully", Place = place });

                return BadRequest(new { Message = "Place already exists" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        // 4. Update Place
        [HttpPut("{placeId}")]
        [Authorize(Roles = "Guide")]
        public async Task<ActionResult> UpdatePlace(int placeId, [FromBody] Place place)
        {
            try
            {
                place.PlaceId = placeId;
                var success = await _placeService.UpdatePlace(placeId, place);
                if (success)
                    return Ok(new { Message = "Place updated successfully" });

                return NotFound(new { Message = "Cannot find any place" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        // 5. Delete Place
        [HttpDelete("{placeId}")]
        [Authorize(Roles = "Guide")]
        public async Task<ActionResult> DeletePlace(int placeId)
        {
            try
            {
                var success = await _placeService.DeletePlace(placeId);
                if (success)
                    return Ok(new { Message = "Place deleted successfully" });

                return NotFound(new { Message = "Cannot find any place" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
    }
}