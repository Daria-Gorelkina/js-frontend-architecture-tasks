// BEGIN

const renderButtons = (companies, container) => {
    companies.forEach((company) => {
        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.textContent = company.name;
        button.dataset.id = company.id;
        container.appendChild(button);
    });
};

const toggleDescription = (company, container) => {
    const currentDescription = container.querySelector('div');
    if (currentDescription) {
        currentDescription.remove();
    }

    if (currentDescription && currentDescription.dataset.id == company.id) {
        return;
    }

    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = company.description;
    descriptionDiv.dataset.id = company.id;
    container.appendChild(descriptionDiv);
};

const run = (companies) => {
    const container = document.querySelector('.container');

    renderButtons(companies, container);

    container.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        const companyId = event.target.dataset.id;
        const company = companies.find((c) => c.id == companyId);

        toggleDescription(company, container);
    });
};

export default run;

// END
