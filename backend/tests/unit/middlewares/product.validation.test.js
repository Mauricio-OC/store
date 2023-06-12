const validationProductName = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    } 
    next();
  };
  
  const validateNameMinLength = (req, res, next) => {
    const { name } = req.body;
  
    if (name.length < 5) {
      return res.status(422).json({ message: 'O campo "name" deve ter pelo menos 5 caracteres' });
    } 
    next();
  };
  
  module.exports = { 
    validationProductName,
     validateNameMinLength,
    };