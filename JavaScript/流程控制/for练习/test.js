for (let i = 100;i < 1000;i += 1) {
    const pos1 = parseInt(String(i).slice(0, 1), 10);
    const pos2 = parseInt(String(i).slice(1, 2), 10);
    const pos3 = parseInt(String(i).slice(2, 3), 10);
    const sum = pos1**3 + pos2**3 + pos3**3;
    if (sum === i) {
        console.log(i);
    }
}