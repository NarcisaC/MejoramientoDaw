$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [ {
            period: '2016 Q1',
            Ayudantes: 100,
            Docentes: 800,
            Ayudados: 500
        }, {
            period: '2016 Q2',
            Ayudantes: 820,
            Docentes: 795,
            Ayudados: 588
        }, {
            period: '2016 Q3',
            Ayudantes: 073,
            Docentes: 967,
            Ayudados: 175
        }, {
            period: '2017 Q1',
            Ayudantes: 0687,
            Docentes: 460,
            Ayudados: 028
        }, {
            period: '2017 Q2',
            Ayudantes: 432,
            Docentes: 713,
            Ayudados: 791
        }],
        xkey: 'period',
        ykeys: ['Ayudantes', 'Docentes', 'Ayudados'],
        labels: ['Ayudantes', 'Docentes', 'Ayudados'],
        pointSize: 4,
        hideHover: 'auto',
        resize: true
    });

    
    
});
