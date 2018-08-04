var Calculadora = {
	keys: {'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','punto':'.','sign':'s','mas':'+','menos':'-','por':'*','dividido':'/','raiz':'r','igual':'=','on':'o'},
	ids: {'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','.':'punto','s':'sign','+':'mas','-':'menos','*':'por','/':'dividido','r':'raiz','=':'igual','o':'on'},
	pantalla: document.getElementById('display'),
	pantallaGuardada: '',
	operacionActual: '',
	operacionAnterior: '',
	init: function() {
    document.onkeyup = this.manejadorKeyUp;
		document.onmousedown = this.manejadorMouseDown;
		document.onkeydown = this.manejadorKeyDown;
		document.onmouseup = this.manejadorMouseUp;
	},
	manejadorKeyDown: function(e) {
		Calculadora.presionarBoton(Calculadora.ids[e.key]);
	},
	manejadorKeyUp: function(e) {
		console.log('key up');
		Calculadora.soltarBoton();
		Calculadora.gestionarEvento(Calculadora.keys[Calculadora.ids[e.key]]);
	},
	manejadorMouseDown: function(e) {
		Calculadora.presionarBoton(Calculadora.ids[Calculadora.keys[e.target.id]]);
	},
	manejadorMouseUp: function(e) {
		Calculadora.soltarBoton();
		Calculadora.gestionarEvento(Calculadora.keys[e.target.id]);
	},
	gestionarEvento: function(key) {
		var aux = this.pantalla.innerText;
		if (aux != 'Infinity' && aux != '-Infinity' && aux != 'NaN', aux != 'Off Limits') {
			switch (key) {
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					this.gestionarNumero(key);
					break;
				case '.':
					this.gestionarPunto();
					break;
				case 's':
					this.gestionarFirma();
					break;
				case '+':
				case '-':
				case '*':
				case '/':
				case 'r':
					this.gestionarOperarcion(key);
					break;
				case 'o':
					this.resetear();
					break;
				case '=':
					this.gestionarIgual();
			}
		} else if (key == 'o') this.resetear();
	},

	gestionarPunto: function() {
		if (this.operacionActual == '=')
			this.resetear();
		if (this.pantalla.innerText.indexOf('.') == -1) {
			this.pantalla.innerText += '.';
		}
	},

	gestionarFirma: function() {
		if (this.pantalla.innerText != '0') {
			if (this.pantalla.innerText[0] != "-") {
				this.pantalla.innerText = '-' + this.pantalla.innerText;
			} else {
				this.pantalla.innerText = this.pantalla.innerText.replace('-','');
			}
		}
	},

  gestionarNumero: function(numero) {
		if (this.operacionActual == '=')
			this.resetear();
		else if (this.operacionActual != '') {
			this.pantallaGuardada = this.pantalla.innerText;
			this.pantalla.innerText = '';
		}
		if (this.pantalla.innerText == '0')
			this.pantalla.innerText = numero;
		else if (this.pantalla.innerText.replace('-','').replace('.','').length < 8)
			this.pantalla.innerText += numero;
	},

	gestionarOperarcion: function(operacion) {
		if (this.operacionActual == '=') {
			this.operacionAnterior = this.operacionActual;
		}
		else if (operacion == 'r') {
			if (this.pantallaGuardada != '')
				this.pantalla.innerText = sqrt(this.operar(this.operacionActual));
			else
				this.pantalla.innerText = this.operar(operacion);
			this.operacionAnterior = this.operacionActual;
		}
		else if (this.pantallaGuardada != '') {
			this.pantalla.innerText = this.operar(this.operacionActual);
			this.operacionAnterior = this.operacionActual;
		}
		this.operacionActual = operacion;
		this.pantallaGuardada = '';
	},

	gestionarIgual: function() {
		if (this.operacionActual == '=') {
			this.pantalla.innerText = this.operar(this.operacionAnterior);
		} else if (this.pantallaGuardada != '') {
			var aux = this.pantalla.innerText;
			this.pantalla.innerText = this.operar(this.operacionActual);
			this.pantallaGuardada = aux;
			this.operacionAnterior = this.operacionActual;
			this.operacionActual = '=';
		} else {

		}
	},

	operar: function(operacion) {
		switch (operacion) {
			case '+':
				res = Number(this.pantallaGuardada) + Number(this.pantalla.innerText);
				break;
			case '-':
				res = Number(this.pantallaGuardada) - Number(this.pantalla.innerText);
				break;
			case '*':
				res = Number(this.pantallaGuardada) * Number(this.pantalla.innerText);
				break;
			case '/':
				res = Number(this.pantallaGuardada) / Number(this.pantalla.innerText);
				break;
			case 'r':
				res = Math.sqrt(Number(this.pantalla.innerText));
				break;
		}
		if (res > 99999999 || (res < 0.0000001 && res > -0.0000001))
			res = 'Off Limits'
		else if (res.toString().indexOf('.') != -1 && res.toString().indexOf('-') != -1)
			res = res.toString().slice(0,10);
		else if (res.toString().indexOf('.') != -1 || res.toString().indexOf('-') != -1)
			res = res.toString().slice(0,9);
		else
			res = res.toString().slice(0,8);
		return res;
	},

	presionarBoton: function(id) {
		if (btn = document.getElementById(id)) {
			btn.style.transform = 'scale(.9,.9)';
			btn.classList.add('activa');
		}
	},

	soltarBoton: function() {
		if (btn = document.querySelector('.tecla.activa')) {
			btn.style.transform = 'scale(1,1)';
			btn.classList.remove('activa');
		}
	},

	resetear: function() {
		this.operacionActual = '';
		this.operacionAnterior = '';
		this.pantalla.innerText = '0';
		this.pantallaGuardada = '';
	}
};

window.onload = function() {
	Calculadora.init();5
	console.log('calculadora lista')
};
