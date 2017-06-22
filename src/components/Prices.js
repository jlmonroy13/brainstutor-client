import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router';


const Prices = () => {
	return (
	<div className="container-fluid pricesFont">
		<h3 className="pricesTitle">Encuentra tutorias de alta calidad a precios asequibles. Solo pagaras por las horas reservadas.</h3>
			<div className="grid no-space push--bottom grid--middle text-center">
				<div className="grid__item one-half section-gratis">
					<div className="circle">
						<div className="gratisContainer">
							<h1 className="gratisTitle">GRATIS</h1>
						</div>
						<p className="p-price">87% de nuestros clientes empiezan conociendo un tutor gratis.</p>
					</div>
					<div className="pricesList__container">
						<ul className="pricesList">
							<li className="li-price">
								<div className="priceDetail">
									<p className="p-price">Revisa el perfil de los tutores.</p>
								</div>
								<div className="priceDetailcheck">
									<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
								</div>
							</li>
							<li className="li-price">
								<div className="priceDetail">
									<p className="p-price">Reserva la hora de tu tutoria.</p>
								</div>
								<div className="priceDetailcheck">
									<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
								</div>
							</li>
							<li className="li-price">
								<div className="priceDetail">
									<p className="p-price">10 minutos para conocer a tu tutor.</p>
								</div>
								<div className="priceDetailcheck">
									<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
								</div>
							</li>
						</ul>
					</div>
					<Link className="button-price" to="/estudiantes/registrarse">
						<h5 className="h5-price">Empieza Ahora</h5>
					</Link>
				</div>
				<div className="grid__item one-half section-premium">
					<div className="circle">
						<div className="gratisContainer">
							<h1 className="gratisTitle">Tutoria Online</h1>
						</div>
						<p className="p-price">El 80% de nuestros tutores cobra entre $30.000 - $45.000 COP.</p>
					</div>
					<div className="pricesList__container">
						<ul className="pricesList">
							<li className="li-price">
								<div className="priceDetail">
									<p className="p-price">Sesiones grabadas.</p>
								</div>
								<div className="priceDetailcheck">
									<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
								</div>
							</li>
							<li className="li-price">
								<div className="priceDetail">
									<p className="p-price">Profesores especializados por materia.</p>
								</div>
								<div className="priceDetailcheck">
									<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
								</div>
							</li>
							<li className="li-price">
								<div className="priceDetail">
									<p className="p-price">Entorno de aprendizaje Interactivo.</p>
								</div>
								<div className="priceDetailcheck">
									<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
								</div>
							</li>
						</ul>
						<Link className="button-price" to="/ver-tutores">
							<h5 className="h5-price">Ver tutores</h5>
						</Link>
					</div>
				</div>
			</div>
			<div className="paySection">
				<img className="payLogo" src='https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/epayco_pago_seguro_black.png' />
			</div>
			<div className="pricesQuestions">
				<div className="container favQuestions text-center">
					<h4 className="siderule">
						<span className="span-price">Preguntas frecuentes</span>
					</h4>
					<div className="grid no-space push--bottom grid--middle text-center">
						<div className="grid__item one-half">
							<div className="favPricesbox">
								<h6><strong>¿Cuanto cuesta una tutoría en BrainsTutor?</strong></h6>
								<p className="p-price">Cada tutor establece el costo de su tutoria pero el 80% de nuestros tutores cobran entre $30.000 - $45.000 COP por hora. Puedes ver cuanto cobra cada tutor en su perfil y conocerlo antes de decidirte a tomar una tutoria paga.</p>
							</div>
						</div>
						<div className="grid__item one-half">
							<div className="favPricesbox">
								<h6><strong>¿Como puedo pagar por las tutorías?</strong></h6>
								<p className="p-price">Contamos con el sistema de pago a través de la plataforma ePayco la cual permite hacer pagos con tarjetas de credito, debido(PSE) y pagos en efectivo con Baloto o Efective(Estos dos úlitmos solo en Colombia).</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container favQuestions">
					<div className="grid no-space push--bottom grid--middle text-center">
						<div className="grid__item one-half">
							<div className="favPricesbox">
								<h6><strong>¿El registro en la plataforma es gratuito?</strong></h6>
								<p className="p-price">El registro a BrainsTutor es totalmente gratis. Al registrarte puedes acceder a las tutorias gratuitas de 10 minutos para conocer a tu tutor, y asi poder estar seguro que si es el tutor indicado para resolver todas tus dudas.</p>
							</div>
						</div>
						<div className="grid__item one-half">
							<div className="favPricesbox">
								<h6><strong>¿Por qué no todos los tutores cobran el mismo precio?</strong></h6>
								<p className="p-price">BrainsTutor provee una guia en la cual los tutores pueden establecer el precio por su tutoria. Ese precio refleja la experiencia y el conocimiento de cada tutor.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
	</div>

	);
};

export default Prices;
