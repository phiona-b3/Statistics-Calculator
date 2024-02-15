const calculateStatistics = () => {
    const numbersInput = document.getElementById('numbers').value.trim();
    const numbersArray = numbersInput.split(/,\s*/g).map(Number).filter(num => !isNaN(num));
    
    if (numbersArray.length === 0) {
        alert('Please enter valid numbers.');
        return;
    }
  
    const mean = calculateMean(numbersArray);
    const mode = calculateMode(numbersArray);
    const standardDeviation = calculateStandardDeviation(numbersArray);
  
    displayResults(mean, mode, standardDeviation);
}

const calculateMean = (numbers) => numbers.reduce((acc, num) => acc + num, 0) / numbers.length; 

const calculateMode = (numbers) => {
  const counts = {};
  numbers.forEach((num) => {
      counts[num] = (counts[num] || 0) + 1;
  })
  if (new Set(Object.values(counts)).size === 1) {
    return "No mode";
  }
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  const mode = Object.keys(counts).filter(
    (num) => counts[num] === counts[highest]
  );
  return mode.join(", ");
}
  
const calculateStandardDeviation = (numbers) => {
  const mean = calculateMean(numbers);
  const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / numbers.length;
  return Math.sqrt(variance);
}

const displayResults = (mean, mode, standardDeviation) => {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <p>Mean: ${mean.toFixed(2)}</p>
    <p>Mode: ${mode}</p>
    <p>Standard Deviation: ${standardDeviation.toFixed(2)}</p>
  `;
}

  