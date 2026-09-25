const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('open');
        });
    });
}

const reveals = document.querySelectorAll('[data-reveal]');
if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    reveals.forEach(element => observer.observe(element));
} else {
    reveals.forEach(element => element.classList.add('in'));
}

const chips = document.querySelectorAll('.chip');
const grid = document.getElementById('catalog-grid');
const empty = document.getElementById('empty');
if (chips.length && grid) {
    const cards = [...grid.querySelectorAll('.card')];
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(item => item.classList.remove('chip--active'));
            chip.classList.add('chip--active');
            const filter = chip.dataset.filter;
            let visible = 0;
            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.style.display = show ? '' : 'none';
                if (show) visible += 1;
            });
            if (empty) empty.hidden = visible !== 0;
        });
    });
}

const carSelect = document.getElementById('car-select');
document.querySelectorAll('.js-pick').forEach(button => {
    button.addEventListener('click', () => {
        if (carSelect && button.dataset.car) carSelect.value = button.dataset.car;
    });
});

const form = document.getElementById('order-form');
if (form) {
    const success = document.getElementById('form-success');
    const setInvalid = (field, invalid) => field.classList.toggle('is-invalid', invalid);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /[0-9]{6,}/;
    const validate = () => {
        let valid = true;
        const nameField = form.name.closest('.field');
        const nameOk = form.name.value.trim().length >= 2;
        setInvalid(nameField, !nameOk);
        if (!nameOk) valid = false;
        const phoneField = form.phone.closest('.field');
        const phoneOk = phoneRe.test(form.phone.value.replace(/\D/g, ''));
        setInvalid(phoneField, !phoneOk);
        if (!phoneOk) valid = false;
        const emailField = form.email.closest('.field');
        const emailValue = form.email.value.trim();
        const emailOk = emailValue === '' || emailRe.test(emailValue);
        setInvalid(emailField, !emailOk);
        if (!emailOk) valid = false;
        const agreeField = form.agree.closest('.checkbox');
        const agreeOk = form.agree.checked;
        setInvalid(agreeField, !agreeOk);
        if (!agreeOk) valid = false;
        return valid;
    };
    form.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('input', () => {
            const wrapper = element.closest('.field, .checkbox');
            if (wrapper) wrapper.classList.remove('is-invalid');
            if (success) success.hidden = true;
        });
    });
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!validate()) {
            const firstError = form.querySelector('.is-invalid');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (success) {
            success.hidden = false;
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
    });
}
