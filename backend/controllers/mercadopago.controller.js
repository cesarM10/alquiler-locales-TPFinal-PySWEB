const mercadopago = require("mercadopago");

const mercadopagoCtrl = {}
const client = new mercadopago.MercadoPagoConfig({ 
	accessToken: 'APP_USR-1182613218721804-070902-d698eb10ae39fee5d57db8564882b40a-1894150556', 
	options: { timeout: 5000, idempotencyKey: 'abc' } 
});

mercadopagoCtrl.getPayment = async(req, res) => {
	try{
		var payment = new mercadopago.Payment(client);
		var paymentT = await payment.get({ id: req.params.id })
		res.status(200).json(paymentT);
	}catch(error){
		res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
	}
}

mercadopagoCtrl.pending = async(req, res) => {
	try{

	}catch(error){
		res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
	}
}

mercadopagoCtrl.failure = async(req, res) => {
	try{

	}catch(error){
		res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
	}
}

mercadopagoCtrl.createPreference = async(req, res) => {
	try{
		const body = {
			items: [
				{
					id: req.body.product_id,
					title: req.body.title,
					unit_price: Number(req.body.price),
					quantity: Number(req.body.quantity),
					description: req.body.description
				}
			],
			back_urls: {
				"success": "http://localhost:4200/cuota",
				"failure": "http://localhost:4200/cuota",
				"pending": "http://localhost:4200/cuota"
			},
			auto_return: "approved",
		}
	
		const preference = new mercadopago.Preference(client);
		var preferenceCreate = await preference.create({ body });
	
		res.status(200).json(preferenceCreate);
	}catch(error){
		res.status(400).json({ status: '0', msg: 'Error procesando operación.', error: error.message });
	}
}

module.exports = mercadopagoCtrl;