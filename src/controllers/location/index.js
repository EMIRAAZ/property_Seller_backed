const { Op } = require("sequelize");
const Property = require("../../models/Property");
const locationService = require("./service");

async function searchLocation(req, res) {
  const body = { ...req.body };

  const bedRoomNo = parseInt(req.body.bedActive ? req.body.bedActive : 0);
  const priceFrom = parseInt(req.body.priceFrom ? req.body.priceFrom : 0);
  const priceTo = parseInt(req.body.priceTo ? req.body.priceTo : 0);
  try {
    const activePropertyCount = await Property.count({
      where: {
        title: {
          [Op.iLike]: `%${req.body.searchQuery}%`,
        },
        propertyType: {
          [Op.iLike]: `%${req.body.propertyActive}%`,
        },
        noOfBedroom: bedRoomNo,
        price: {
          [Op.between]: [priceFrom, priceTo],
        },
      },
    });

    if (activePropertyCount === 0) {
      return res.status(200).json({
        status: 200,
        data: 0,
      });
    }

    return res.status(200).json({
      status: 200,
      data: activePropertyCount,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message || "not properties found!" });
  }
}

module.exports = {
  searchLocation: [searchLocation],
};
