import Chartscii from "chartscii";

const AsciiChartPlugin = {
    id: 'chartscii',
    init: function (reveal) {
        document.querySelectorAll('.chartscii').forEach((element) => {
            const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Beispiel-Daten
            const options = {
                title: "Chartscii",
                width: 50,
                theme: "pastel",
                color: "pink",
                colorLabels: false,
                barSize: 2,
                orientation: "vertical"
            };
            
            // Erzeuge das Diagramm und füge es dem Element hinzu
            const chart = new Chartscii(data, options);
            element.textContent = chart.create();
        });
    }
};

export default AsciiChartPlugin;
