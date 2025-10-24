const calendario = document.getElementById('calendario');
const opcoes = {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    width: 500,
    height: 500,
    headerToolbar: {
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        center: 'title',
        left: ''
    }
};

const calendarioJS = new FullCalendar.Calendar(calendario, opcoes);

const reservasLS = window.localStorage.getItem('reservas');

if (reservasLS) {
    try {
        const reservas = JSON.parse(reservasLS);
    
        reservas.forEach(reserva => {
            const dataFormatada = reserva.data;
            
            calendarioJS.addEvent({
                title: `${reserva.nome} - ${reserva.produto} (${reserva.quantidade})`,
                start: dataFormatada,
                extendedProps: {
                    telefone: reserva.telefone,
                    quantidade: reserva.quantidade
                }
            });
        });
    } catch (err) {
        console.error('Erro ao carregar reservas:', err);
    }
}

calendarioJS.render();