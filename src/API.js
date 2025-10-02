// JavaScript Example: Reading Entities
// Filterable fields: title, periphery, target_cost, target_selling_price, size, bedrooms, bathrooms, photos_before, photos_3d_render, photos_after, golden_visa_eligible, description, features, completion_date, status
async function fetchRealEstateProjectEntities() {
  const response = await fetch(
    `https://app.base44.com/api/apps/68de306a6d9b2b5362a18176/entities/RealEstateProject`,
    {
      headers: {
        api_key: "5149e602d06645479fab3dbb3e983e3e", // or use await User.me() to get the API key
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: title, periphery, target_cost, target_selling_price, size, bedrooms, bathrooms, photos_before, photos_3d_render, photos_after, golden_visa_eligible, description, features, completion_date, status
async function updateRealEstateProjectEntity(entityId, updateData) {
  const response = await fetch(
    `https://app.base44.com/api/apps/68de306a6d9b2b5362a18176/entities/RealEstateProject/${entityId}`,
    {
      method: "PUT",
      headers: {
        api_key: "5149e602d06645479fab3dbb3e983e3e", // or use await User.me() to get the API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }
  );
  const data = await response.json();
  console.log(data);
}
