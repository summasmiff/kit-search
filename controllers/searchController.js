var kit_data = require('../KITS_SHIPPING_DATA.json')

exports.search = (req, res) => {
  let kit_id = req.query.kit_id;

  //don't try to load if no query parameters are provided
  if (!kit_id) {
    return res.status(200).json({
      data: [],
      error: null,
    });
  };
  getByKitId(req, res, kit_id);
};

const getByKitId = ((req, res, kit_id) => {
  const kits = kit_data.filter(k => {
    return k.label_id.startsWith(kit_id)
  });

  return res.status(200).json({
    data: kits,
    error: null,
  });
});
