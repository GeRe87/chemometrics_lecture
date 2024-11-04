
const offsetSlider1 = document.getElementById('offsetSlider1');
const offsetSlider2 = document.getElementById('offsetSlider2');
const offsetSlider3 = document.getElementById('offsetSlider3');
const anovaTable = document.getElementById('anovaTable');

// Initial group data
let group1 = [50, 51, 49, 52];
let group2 = [50, 51, 48, 52];
let group3 = [50, 50, 51, 49];

function calculateANOVA(offset1, offset2, offset3) {
    // Apply offsets to each group
    const updatedGroup1 = group1.map(value => value + offset1);
    const updatedGroup2 = group2.map(value => value + offset2);
    const updatedGroup3 = group3.map(value => value + offset3);
    
    // Calculate means
    const mean1 = updatedGroup1.reduce((sum, val) => sum + val, 0) / updatedGroup1.length;
    const mean2 = updatedGroup2.reduce((sum, val) => sum + val, 0) / updatedGroup2.length;
    const mean3 = updatedGroup3.reduce((sum, val) => sum + val, 0) / updatedGroup3.length;
    const overallMean = (mean1 + mean2 + mean3) / 3;
    
    // Sum of Squares Between
    const SSBetween = updatedGroup1.length * (Math.pow(mean1 - overallMean, 2) + Math.pow(mean2 - overallMean, 2) + Math.pow(mean3 - overallMean, 2));
    
    // Sum of Squares Within
    const SSWithin = updatedGroup1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) +
                     updatedGroup2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0) +
                     updatedGroup3.reduce((sum, val) => sum + Math.pow(val - mean3, 2), 0);
    
    const SSTotal = SSBetween + SSWithin;
    
    // Degrees of Freedom
    const dfBetween = 2;
    const dfWithin = updatedGroup1.length * 3 - 3;
    
    // Mean Squares
    const MSBetween = SSBetween / dfBetween;
    const MSWithin = SSWithin / dfWithin;
    
    // F-statistic and p-value (assuming F > 3 as significant for demonstration)
    const F = MSBetween / MSWithin;
    // const pValue = F > 3 ? "< 0.05" : "> 0.05";
    // calculate p-value using F-distribution
    const pValue = (1-jStat.centralF.cdf(F, dfBetween, dfWithin)).toFixed(4);

    // Update ANOVA table
    anovaTable.innerHTML = `
Source      | Sum of Squares (SS) | Degrees of Freedom (df) | Mean Square (MS)   | F-Statistic | p-value
---------------------------------------------------------------------------------------------------------
Between (B) | ${(SSBetween > 10 ? SSBetween.toFixed(1) : SSBetween.toFixed(2))}                | ${dfBetween}                       | ${(MSBetween > 10 ? MSBetween.toFixed(1) : MSBetween.toFixed(2))}               | ${F.toFixed(2)}        | ${pValue}
Within (W)  | ${SSWithin.toFixed(2)}               | ${dfWithin}                       | ${MSWithin.toFixed(2)}             
---------------------------------------------------------------------------------------------------------
Total (T)   | ${SSTotal.toFixed(2)}               | ${dfBetween + dfWithin}                      | ${(SSTotal / (dfBetween + dfWithin)).toFixed(2)}              
    `;
}

// Initial calculation
calculateANOVA(0, 0, 0);

// Update table when sliders change
[offsetSlider1, offsetSlider2, offsetSlider3].forEach((slider, index) => {
    slider.addEventListener('input', () => {
        calculateANOVA(parseFloat(offsetSlider1.value), parseFloat(offsetSlider2.value), parseFloat(offsetSlider3.value));
    });
});