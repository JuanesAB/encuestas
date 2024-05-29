new Vue({
    el: '.wrapper',
    data: {
        infoEncuestas: [],
        preguntasEncuesta: [],
        infoRespuestas: [] // Nueva propiedad
    },
    mounted() {
        this.cargarEncuestas();
    },
    methods: {
        async cargarEncuestas() {
            try {
                const response = await axios.post('http://localhost:3002/ENCUESTAS/consultarEncuestasGenerales');
                if (response.data) {
                    this.infoEncuestas = response.data.data.map(encuesta => {
                        return { ...encuesta, mostrarDetalle: false };
                    });
                }
            } catch (error) {
                console.error('Error cargando las encuestas:', error);
            }
        },
        async toggleDetalle(index) {
            try {
                const response = await axios.post('http://localhost:3002/ENCUESTAS/personasRespondidas', this.infoEncuestas[index]);
                this.preguntasEncuesta = response.data.data;
                console.log(this.preguntasEncuesta);
            } catch (error) {
                console.error('Error al consultar las personas que respondieron la encuesta:', error);
            }
            this.infoEncuestas[index].mostrarDetalle = !this.infoEncuestas[index].mostrarDetalle;
        },
        removerDetalle(index) {
            this.infoEncuestas[index].mostrarDetalle = false;
            if (index >= 0 && index < this.infoEncuestas.length) {
                // Cambiar el valor de mostrarDetalle en el índice dado
                this.$set(this.infoEncuestas[index], 'mostrarDetalle', false);
                
                // Remover el elemento del DOM manualmente
                const overlay = document.querySelector('.detalle-overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }
        },
        async obtenerResultado(index) {
            try {
                const response = await axios.post('http://localhost:3002/ENCUESTAS/respuestasPersonas', {id: this.infoEncuestas[index].id, numPerson: this.preguntasEncuesta[index].numPerson}) 
                this.infoRespuestas = response.data.data;
            } catch (error) {
                console.error('Error al consultar las respuestas de la encuesta:', error);
            }
            console.log(index)

            this.infoRespuestas[index].mostrarDetalle = !this.infoRespuestas[index].mostrarDetalle;
        },
        removerDetalleRespuesta(index) {
            // Asegurar que el índice esté dentro de los límites del array
            if (index >= 0 && index < this.infoRespuestas.length) {
                // Cambiar el valor de mostrarDetalle en el índice dado
                this.$set(this.infoRespuestas[index], 'mostrarDetalle', false);
                
                // Remover el elemento del DOM manualmente
                const overlay = document.querySelector('.detalle-overlay2');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }
        }
        
        
        
    }
});
