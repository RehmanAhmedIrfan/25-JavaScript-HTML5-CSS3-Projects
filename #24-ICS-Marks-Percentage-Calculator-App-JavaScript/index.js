const calculateFormEl = document.getElementById("calculateForm");
const resultEl = document.getElementById("result");

const calculateMarks = (event) => {
  const maxMarks = 1200;
  event.preventDefault();

  const formData = new FormData(calculateFormEl);

  const data = {};

  formData.forEach((value, key) => {
    data[key] = +value;
  });
  const totalMarks =
    data.maths +
    data.english +
    data.urdu +
    data.computer +
    data.physics +
    data.pakstudies +
    data.islamiceducation +
    data.translationofholyquran;
  const percentage = Math.round((totalMarks / maxMarks) * 100);
  resultEl.innerText = `You have got ${totalMarks} marks out of ${maxMarks} and your percentage is ${percentage}%`;
};
