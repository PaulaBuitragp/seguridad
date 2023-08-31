// Function to clean and normalize text
function cleanText(text) {
    const characterMap = {
      á: "a",
      é: "e",
      í: "i",
      ó: "o",
      ú: "u",
      ü: "u",
      Á: "A",
      É: "E",
      Í: "I",
      Ó: "O",
      Ú: "U",
      Ü: "U",
    };
  
    const specialCharactersRegex = /[\s.,\/#!$%\^&\*;:{}=\-_`~()\n0-9]/g;
  
    function replaceCharacter(character) {
      return characterMap[character] || character;
    }
  
    return text
      .replace(specialCharactersRegex, "")
      .replace(/[áéíóúüÁÉÍÓÚÜ]/g, replaceCharacter)
      .toUpperCase();
  }
  
  // Function to check if two numbers are coprime
  function areCoprimes(a, b) {
    function calculateGCD(x, y) {
      return y === 0 ? x : calculateGCD(y, x % y);
    }
    return calculateGCD(a, b) === 1;
  }
  
  // Function to calculate the modular multiplicative inverse
  function modularInverse(a, m) {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return 1;
  }
  
  // Function for encryption
  function encryption(plaintext, a, b) {
    if (areCoprimes(a, 27)) {
      const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
      const m = ALPHABET.length;
      let ciphertext = "";
  
      for (const char of plaintext) {
        const index = ALPHABET.indexOf(char);
        if (index === -1) {
          ciphertext += char;
        } else {
          const encryptedIndex = (a * index + b) % m;
          const encryptedChar = ALPHABET[encryptedIndex];
          ciphertext += encryptedChar;
        }
      }
  
      return ciphertext;
    } else {
      alert("A y B deben ser coprimos");
      return null;
    }
  }
  
  // Function to calculate the frequency of characters
  function calculateCharacterFrequency(text) {
    const frequencyMap = {};
    for (const char of text) {
      if (frequencyMap[char]) {
        frequencyMap[char]++;
      } else {
        frequencyMap[char] = 1;
      }
    }
    return frequencyMap;
  }
  function getTextAndEncrypt() {
    const text = document.querySelector("#textToEncrypt").value;
    const cleanedText = cleanText(text);
    const a = parseInt(document.querySelector("#aValue").value, 10);
    const b = parseInt(document.querySelector("#bValue").value, 10);
  
    const encryptedText = encryption(cleanedText, a, b);
    if (encryptedText !== null) {
      document.querySelector("#resultToEncrypt").value = encryptedText;
  
      // Calculate frequency histogram
      const frequencyMap = calculateCharacterFrequency(encryptedText);
  
      // Prepare data for the histogram chart
      const labels = Object.keys(frequencyMap);
      const data = Object.values(frequencyMap);
  
      // Display histogram chart
      const encryptedCtx = document.querySelector("#cifradoHistogramChart").getContext("2d");
      const encryptedHistogramChart = new Chart(encryptedCtx, {
          type: "bar",
          data: {
              labels: labels,
              datasets: [{
                  label: "Frequency",
                  data: data,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
    }
  }
  // Function for decryption
function decryption(ciphertext, a, b) {
    if (areCoprimes(a, 27)) {
        const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        const m = ALPHABET.length;
        const aInverse = modularInverse(a, m);
        let plaintext = "";

        for (const char of ciphertext) {
            const index = ALPHABET.indexOf(char);
            if (index === -1) {
                plaintext += char;
            } else {
                const decryptedIndex = (aInverse * (index - b + m)) % m;
                const decryptedChar = ALPHABET[decryptedIndex];
                plaintext += decryptedChar;
            }
        }

        return plaintext;
    } else {
        alert("A y B deben ser coprimos");
        return null;
    }
}

function descifrarTexto() {
    const encryptedText = document.querySelector("#encriptedText").value;
    const a = parseInt(document.querySelector("#numero-a").value, 10);
    const b = parseInt(document.querySelector("#numero-b").value, 10);

    const decryptedText = decryption(encryptedText, a, b);
    if (decryptedText !== null) {
        document.querySelector("#resultToDecrypt").value = decryptedText;

        // Calculate frequency histogram for decrypted text
        const decryptedFrequencyMap = calculateCharacterFrequency(decryptedText);

        // Prepare data for the decrypted histogram chart
        const decryptedLabels = Object.keys(decryptedFrequencyMap);
        const decryptedData = Object.values(decryptedFrequencyMap);

        // Display decrypted histogram chart
        const decryptedCtx = document.querySelector("#descifradoHistogramChart").getContext("2d");
        const decryptedHistogramChart = new Chart(decryptedCtx, {
        type: "bar",
        data: {
            labels: decryptedLabels,
            datasets: [{
                label: "Frequency",
                data: decryptedData,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    }
}

// Attach event listeners to buttons
document.querySelector("#encryptButton").addEventListener("click", getTextAndEncrypt);
document.querySelector("#decryptButton").addEventListener("click", descifrarTexto);
