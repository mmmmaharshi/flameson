export function calculateFlames(
  firstName: string,
  secondName: string,
): { flamesLabel: string; resultText: string } {
  // Clean the names (remove spaces, convert to lowercase)
  const cleanFirstName = firstName.replace(/\s+/g, "").toLowerCase();
  const cleanSecondName = secondName.replace(/\s+/g, "").toLowerCase();

  // Convert names into arrays
  const firstNameArr = cleanFirstName.split("");
  const secondNameArr = cleanSecondName.split("");

  // Remove matching letters
  for (let letter of firstNameArr) {
    const index = secondNameArr.indexOf(letter);
    if (index !== -1) {
      secondNameArr.splice(index, 1);
      firstNameArr.splice(firstNameArr.indexOf(letter), 1);
    }
  }

  // Count remaining letters
  const remainingLetters = firstNameArr.length + secondNameArr.length;

  // Define FLAMES cycle
  const flames: string[] = [
    "Friendship",
    "Love",
    "Affection",
    "Marriage",
    "Enemy",
    "Siblings",
  ];

  // Loop through FLAMES until only one result is left
  let index = 0;
  while (flames.length > 1) {
    index = (index + remainingLetters - 1) % flames.length;
    flames.splice(index, 1);
  }

  // Get final FLAMES result
  const flamesResult = flames[0];

  // Generate dynamic text based on FLAMES result
  let resultText = "";
  let flamesLabel = "";

  switch (flamesResult) {
    case "Friendship":
      flamesLabel = "Friendship";
      resultText = `${firstName} and ${secondName} share a strong bond of Friendship! 👫 True pals forever.`;
      break;
    case "Love":
      flamesLabel = "Love";
      resultText = `${firstName} and ${secondName} are destined for Love! ❤️ Your names are written in the stars together.`;
      break;
    case "Affection":
      flamesLabel = "Affection";
      resultText = `${firstName} and ${secondName} have deep Affection for each other! 🥰 A truly caring connection.`;
      break;
    case "Marriage":
      flamesLabel = "Marriage";
      resultText = `Wedding bells for ${firstName} and ${secondName}! 💍 It’s Marriage in your destiny.`;
      break;
    case "Enemy":
      flamesLabel = "Enemy";
      resultText = `${firstName} and ${secondName} are like fire and ice. 😡 It’s Enemy", that keeps you clashing.`;
      break;
    case "Siblings":
      flamesLabel = "Siblings";
      resultText = `${firstName} and ${secondName} are like siblings! 🙌 A bond of mutual respect and support.`;
      break;
    default:
      flamesLabel = "Unknown";
      resultText = "Something went wrong!";
  }

  // Return both flames label and result text
  return { flamesLabel, resultText };
}
