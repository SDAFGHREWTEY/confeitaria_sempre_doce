class AdminAgenda {
    constructor() {
        this.calendarEl = document.getElementById('calendario');
        this.modal = document.getElementById('modal');
        this.detalhesEl = document.getElementById('detalhes');
        this.btnExcluir = document.getElementById('btnExcluir');
        this.reservaAtual = null;
        this.calendar = null;
        this.init();
    }

    init() {
        this.calendar = new FullCalendar.Calendar(this.calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'pt-br',
            height: 'auto',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: this.getReservas(),
            eventClick: (info) => this.mostrarDetalhes(info.event),
            dayMaxEvents: 3
        });
        this.calendar.render();
        this.setupEvents();
    }

    getReservas() {
        const data = localStorage.getItem('reservas');
        if (!data) return [];
        try {
            const reservas = JSON.parse(data);
            return reservas.map(r => ({
                id: r.id,
                title: `${r.nome} - ${r.produto} (${r.quantidade})`,
                start: r.data,
                extendedProps: r
            }));
        } catch(e) { 
            console.error('Erro:', e);
            return []; 
        }
    }

    mostrarDetalhes(event) {
        this.reservaAtual = event.extendedProps;
        const dataFmt = new Date(this.reservaAtual.data).toLocaleDateString('pt-BR');
        
        this.detalhesEl.innerHTML = `
            <div class="nome">${this.reservaAtual.nome}</div>
            <div class="info"><strong>Produto:</strong> ${this.reservaAtual.produto}</div>
            <div class="info"><strong>Qtd:</strong> ${this.reservaAtual.quantidade}</div>
            <div class="info"><strong>Data:</strong> ${dataFmt}</div>
            <div class="info"><strong>Tel:</strong> ${this.reservaAtual.telefone}</div>
        `;
        this.modal.style.display = 'block';
    }

    excluir() {
        if (confirm('Excluir esta reserva?')) {
            let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
            reservas = reservas.filter(r => r.id != this.reservaAtual.id);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            this.calendar.refetchEvents();
            this.fecharModal();
            alert('Excluída!');
        }
    }

    fecharModal() {
        this.modal.style.display = 'none';
    }

    setupEvents() {
        document.querySelector('.close').onclick = () => this.fecharModal();
        window.onclick = (e) => e.target == this.modal && this.fecharModal();
        this.btnExcluir.onclick = () => this.excluir();
    }
}

document.addEventListener('DOMContentLoaded', () => new AdminAgenda());