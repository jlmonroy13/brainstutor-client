import React from 'react';
import Footer from './Footer';


const Prices = () => {
  return (

    <div className="container-fluid pricesFont">
    	<h3 className="pricesTitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    	tempor incididunt ut labore et dolore magna aliqua.</h3>
  		<div className="grid no-space push--bottom grid--middle text-center">
  			<div className="grid__item one-half section-gratis">
  				<div className="circle">
  					<div className="gratisContainer">
  						<h1 className="gratisTitle">GRATIS</h1>
  					</div>
  					<p>87% de nuestros clientes empiezan conociendo un tutor gratis.</p>
  				</div>
  				<div>
  					<ul className="pricesList">
  						<li>
  							<div className="priceDetail">
  								<p>Lorem ipsum dolor sit amet elit.</p>
  							</div>
			  				<div className="priceDetailcheck">
			  					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
			  				</div>
  						</li>
  						<li>
  							<div className="priceDetail">
  								<p>Lorem ipsum dolor sit amet elit.</p>
  							</div>
			  				<div className="priceDetailcheck">
			  					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
			  				</div>
  						</li>
  						<li>
  							<div className="priceDetail">
  								<p>Lorem ipsum dolor sit amet elit.</p>
  							</div>
			  				<div className="priceDetailcheck">
			  					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
			  				</div>
  						</li>
  						<li>
  							<div className="priceDetail">
  								<p>Lorem ipsum dolor sit amet elit.</p>
  							</div>
			  				<div className="priceDetailcheck">
			  					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
			  				</div>
  						</li>
  					</ul>
  				</div>
  				<button>
  					<h5>Empezar</h5>
  				</button>
				</div>
				<div className="grid__item one-half section-premium">
  				<div className="circle">
  					<div className="gratisContainer">
  						<h1 className="gratisTitle">PLAN PREMIUM</h1>
  					</div>
  					<p>Cuenta con múltiples beneficios, acceso a videos y contenido especial.</p>
  				</div>
  				<div>
  					<ul className="pricesList">
  						<li>
  							<div className="priceDetail">
  								<p>Lorem ipsum dolor sit amet elit.</p>
  							</div>
			  				<div className="priceDetailcheck">
			  					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
			  				</div>
  						</li>
  						<li>
  							<div className="priceDetail">
  								<p>Lorem ipsum dolor sit amet elit.</p>
  							</div>
			  				<div className="priceDetailcheck">
			  					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
			  				</div>
  						</li>
  						<li>
  							<div className="priceDetail">
  								<p>Lorem ipsum dolor sit amet elit.</p>
  							</div>
			  				<div className="priceDetailcheck">
			  					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
			  				</div>
  						</li>
  						<li>
  							<div className="priceDetail">
  								<p>Lorem ipsum dolor sit amet elit.</p>
  							</div>
			  				<div className="priceDetailcheck">
			  					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
			  				</div>
  						</li>
  					</ul>
  				</div>
  				<button>
  					<h5>Empezar</h5>
  				</button>
				</div>
			</div>
			<div className="grid no-space push--bottom grid--middle text-center">
				<h1>¿Que incluye?</h1>
				<div className="grid__item one-third">
					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
					<p>Tutorias Uno a Uno.</p>
				</div>
				<div className="grid__item one-third">
					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
					<p>Sesiónes grabadas.</p>
				</div>
				<div className="grid__item one-third">
					<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
					<p>Entorno de aprendizaje interactivo.</p>
				</div>
			</div>
			<div className="text-center">
				<img className="hero__tutor-selector-icon" src={require('../assets/images/check-icon-complete.png')} />
				<p className="feedbackText">Sesión de feedback.</p>
			</div>

			<div className="payUsection">
				<div>
					<div className="payUlogoDiv" align="right">
						<img className="payUlogo" src={require('../assets/images/payu-logo.png')} />
					</div>
					<div className="payUDetails">
						<h2 className="font2"><b>Payments secured by PayU</b></h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt.</p>
					</div>
				</div>
			</div>
			<div className="pricesQuestions">
				<div className="container favQuestions text-center">
					<h4 className="siderule">
						<span>Preguntas frecuentes</span>
					</h4>
					<div className="grid no-space push--bottom grid--middle text-center">
		  			<div className="grid__item one-half">
		  				<div className="favPricesbox">
								<h6><strong>How much does tuition with MyTutor cost?</strong></h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur.</p>
							</div>
						</div>
						<div className="grid__item one-half">
		  				<div className="favPricesbox">
								<h6><strong>How much does tuition with MyTutor cost?</strong></h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur.</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container favQuestions">
					<div className="grid no-space push--bottom grid--middle text-center">
		  			<div className="grid__item one-half">
		  				<div className="favPricesbox">
								<h6><strong>How much does tuition with MyTutor cost?</strong></h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. </p>
							</div>
						</div>
						<div className="grid__item one-half">
		  				<div className="favPricesbox">
								<h6><strong>How much does tuition with Brains cost?</strong></h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. </p>
							</div>
						</div>
					</div>
				</div>
				<div className="container favQuestions">
					<div className="grid no-space push--bottom grid--middle text-center">
		  			<div className="grid__item one-half">
		  				<div className="favPricesbox">
								<h6><strong>How much does tuition with MyTutor cost?</strong></h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur.</p>
							</div>
						</div>
						<div className="grid__item one-half">
		  				<div className="favPricesbox">
								<h6><strong>How much does tuition with MyTutor cost?</strong></h6>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. </p>
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
