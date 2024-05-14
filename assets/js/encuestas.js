new Vue({
    el: '.wrapper',
    data: {
        nombreEncuesta: '',
        modoVisualizacion: 0,
        descripcionEncuesta: '',
        continuarGeneral: true,
        tab: 'general',
        preguntas: [],
        datosEncuesta: {}
    },
    methods: {
        continuarSiNombreLleno() {
            if (this.nombreEncuesta.trim() !== '') {
                this.continuarGeneral = false;
                this.tab = 'questions';
            } else {
                alert('Por favor, ingresa un nombre para la encuesta.');
            }
        },
        agregarPregunta() {
            this.preguntas.push({ 
                texto: '', 
                respuesta: '', 
                respuestas: [],
                agregarOtro: 0,
                opcionesTabla: [],
                requerido: 0,
                caracteres: 0,
                //PARA INPUTS TYPE RANGE
                minLenght: 0,
                maxLenght: 0,
                //CONFIGURACIÓN PARA EL CAMPO SELECCIÓN
                seleccion: '',
                //CONFIGURACIÓN CAMPOS ÚNICA RESPUESTA PARA MOSTRAR CUANDO
                mostrarCuando: '',
                opcionMostrarCuando: '',
                comparacionTexto: '',
            });
        },
        agregarRespuesta(pregunta) {
            pregunta.respuestas.push('');
        },
        agregarOpcionTabla(pregunta) {
            pregunta.opcionesTabla.push({
                descripcion: '',
                SelectUno: '',
                SelectDos: '',
            });
        },
        eliminarPregunta(index) {
            this.preguntas.splice(index, 1);
        },
        eliminarRespuesta(pregunta, respuestaIndex) {
            pregunta.respuestas.splice(respuestaIndex, 1);
        },
        eliminarOpcionTabla(pregunta, opcionIndex) {
            pregunta.opcionesTabla.splice(opcionIndex, 1);
        },
        async guardarEncuesta() {
            try {
            
            this.datosEncuesta = {
                nombre: this.nombreEncuesta,
                descripcion: this.descripcionEncuesta,
                modoVisualizacion: this.modoVisualizacion,
                preguntas: this.preguntas
            };
                console.log(this.datosEncuesta);
                const response = await axios.post('http://localhost:3002/encuestas/guardarEncuesta', this.datosEncuesta);
                console.log('Respuesta del servidor:', response.data);
              } catch (error) {
                console.error('Error al enviar los datos:', error);
                // Maneja el error de alguna manera apropiada
              }
        }
    }
});
