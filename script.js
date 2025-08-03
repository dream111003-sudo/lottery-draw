const drawnIds = [];
const drawnPrizes = [];

function getParticipantId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('pid');
}

function getRandomPrize() {
  const remainingPrizes = prizes.filter(p => !drawnPrizes.includes(p));
  return remainingPrizes[Math.floor(Math.random() * remainingPrizes.length)];
}

document.getElementById('drawButton').addEventListener('click', () => {
  const pid = getParticipantId();
  if (!pid) {
    alert("QRコード経由でアクセスしてください");
    return;
  }

  if (drawnIds.includes(pid)) {
    alert("このIDはすでに抽選済みです！");
    return;
  }

  if (drawnIds.length >= prizes.length) {
    alert("すでにすべての景品が配布されています！");
    return;
  }

  const prize = getRandomPrize();
  drawnIds.push(pid);
  drawnPrizes.push(prize);

  document.getElementById('winnerId').innerText = `🎯 ID: ${pid}`;
  document.getElementById('prizeName').innerText = `🎁 景品: ${prize}`;
  document.getElementById('resultArea').classList.remove('hidden');

  document.getElementById('winSound').play();
});
