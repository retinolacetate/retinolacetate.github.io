const validationFields = [
    {
        id: 'fullname',
        regex: /^[A-ZА-ЯІЇ][A-ZА-ЯІЇa-zа-яії]+ [A-ZА-ЯІЇ]\. [A-ZА-ЯІЇ]\.$/
    },
    {
        id: 'variant',
        regex: /^\d{2}$/
    },
    {
        id: 'group',
        regex: /^[A-ZА-ЯІЇ]{2}-\d{2}$/
    },
    {
        id: 'phone-number',
        regex: /^[(]\d{3}[)]-\d{3}-\d{2}-\d{2}$/
    },
    {
        id: 'id-card',
        regex: /^[A-Z]{2} [№]\d{6}$/
    }
  ]

    document.querySelector('.form').addEventListener('submit', event => {
        event.preventDefault();
        let allValid = true;
        for (const {id, regex} of validationFields) {
            const input = document.getElementById(id);
            const validDiv = document.querySelector(`#${id} + div.warning-text`);

            if (!regex.test(input.value)) {
                allValid = false;
                input.classList.add('warning-b');
                validDiv.classList.remove('hidden');
            } else {
                input.classList.remove('warning-b')
                validDiv.classList.add('hidden');
            }
        }
        if (allValid) {
            for (const {id} of validationFields) {
                document.getElementById(`${id}-validOutput`).innerText = document.getElementById(id).value;
            }
        }

        document.querySelector('#validOutput').classList.toggle('hidden', !allValid);
        document.getElementById('close').addEventListener('click', function handleClose() {
            document.getElementById('validOutput').classList.add('hidden');
        });
    });
