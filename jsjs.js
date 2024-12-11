const months = {
  1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
  7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T"
};

function fiscalCode(person) {
  function generateLetters(name) {
    let consonants = "";
    let vowels = "";
    let result = "";

    for (let i = 0; i < name.length; i++) {
      if ("zrtpqsdfghjklmwxcvbnyZRTYPQSDFGHJKLMWXCVBN".includes(name[i])) {
        consonants += name[i];
      } else if ("aeuioAEUIO".includes(name[i])) {
        vowels += name[i];
      }
    }

    if (consonants.length === 3) {
      result = consonants.slice(0, 3).toUpperCase();
    } else if (consonants.length > 3) {
      result = consonants[0].toUpperCase() + consonants[1].toUpperCase() + consonants[2].toUpperCase();
    } else if (consonants.length < 3) {
      result = consonants.toUpperCase();
      let remainingLength = 3 - result.length;
      result += vowels.slice(0, remainingLength).toUpperCase();
    }

    if (result.length < 3) {
      result = result + "X";
    }

    return result;
  }

  const { name, surname, gender, dob } = person;
  const surnameCode = generateLetters(surname);
  const nameCode = generateLetters(name);
  const [day, month, year] = dob.split('/').map(Number);
  const yearCode = String(year).slice(2);
  const monthCode = months[month];
  let dayCode = day < 10 ? '0' + day : String(day);
  if (gender === 'F') {
    dayCode = String(day + 40).padStart(2, '0');
  }

  return ${surnameCode}${nameCode}${yearCode}${monthCode}${dayCode};
}

console.log(fiscalCode({ name: "Matt", surname: "Edabit", gender: "M", dob: "1/1/1900" })); // DBTMTT00A01
console.log(fiscalCode({ name: "Helen", surname: "Yu", gender: "F", dob: "1/12/1950" })); // YUXHLN50T41
console.log(fiscalCode({ name: "Mickey", surname: "Mouse", gender: "M", dob: "16/1/1928" })); // MSOMKY28A16
console.log(fiscalCode({ name: "Charles", surname: "Chevalier", gender: "M", dob: "1/1/1961" })); // CHEBND61T01
console.log(fiscalCode({ name: "Paul", surname: "Crump", gender: "F", dob: "7/11/1967" })); // CRUMRA67S47