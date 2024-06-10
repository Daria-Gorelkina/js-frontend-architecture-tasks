// BEGIN
export default () => {
    const form = document.querySelector('.form-inline');
    const input = form.querySelector('input[name="number"]');
    const resultDiv = document.getElementById('result');
    const resetButton = form.querySelector('button[type="button"]');

    let sum = 0;

    const updateResult = () => {
        resultDiv.textContent = sum;
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const value = parseInt(input.value, 10);
        if (!isNaN(value)) {
            sum += value;
            updateResult();
        }

        form.reset();
        input.focus();
    });

    resetButton.addEventListener('click', () => {
        sum = 0;
        updateResult();
        form.reset();
        input.focus();
    });

    input.focus();
};

// END