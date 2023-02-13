// COLORS
const mainColorPicker = document.querySelector('#color');
const mainColorValue = document.querySelector('#color-value');

const backgroundColorPicker = document.querySelector('#bg-color');
const backgroundColorValue = document.querySelector('#bg-color-value');

const updateColor = e => {
    const value = e.target.value; // we put the value "#fff" that we got from the DOM inside this const
    mainColorValue.innerText = value;
};

const updateBackgroundColor = e => {
    const value = e.target.value;
    backgroundColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
    mainColorPicker.addEventListener('change', updateColor);
    backgroundColorPicker.addEventListener('change', updateBackgroundColor);
};

addColorPickerEventListeners();
// it will be called ... to get the color listner for ex and check if there is a change  


// SLIDERS
const sizeSlider = document.querySelector('#size');
const sizeValue = document.querySelector('#size-value');

const marginSlider = document.querySelector('#margin');
const marginValue = document.querySelector('#margin-value');

const updateSize = e => {
    const value = e.target.value;
    sizeValue.innerText = `${value} x ${value}`;
};

const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = `${value} px`;
};

const addSliderEventListeners = () => {
    sizeSlider.addEventListener('change', updateSize);
    marginSlider.addEventListener('change', updateMargin);
};

addSliderEventListeners();

// URL / TEXT / DATA
const dataInput = document.querySelector('#data');

// FORMAT
const imageFormat = document.querySelector('input[name="format"]:checked'); //the format with checked 
// BUTTON
const submitButton = document.querySelector('#cta');

// A function to make the sizez is intXint and the colors without the #
const prepareParameters = params => {
    const prepared = {
        data: params.data,
        size: `${params.size}x${params.size}`,
        color: params.color.replace('#', ''),
        bgcolor: params.bgColor.replace('#', ''),
        qzone: params.qZone,    //is the name of the margine 
        format: params.format,
    };

    return prepared;
};

const settingsContainer = document.querySelector('#qr-code-settings');
const resultsContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');

const displayQrCode = imgUrl => {
    settingsContainer.classList.add('flipped');
    resultsContainer.classList.add('flipped');

    qrCodeImage.setAttribute('src', imgUrl);
};

const getQrCode = parameters => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const urlParams = new URLSearchParams(parameters).toString();

    const fullUrl = `${baseUrl}?${urlParams}`; //the format of the url of the api

    // to communicate wiht the api 
    fetch(fullUrl).then(response => {
        if (response.status === 200) {
            displayQrCode(fullUrl);
        }
    });
};

const showInputError = () => {
    dataInput.classList.add('error');
};

// the data / url on change 
const dataInputEventListener = () => {
    dataInput.addEventListener('change', e => {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        } else {    //if the text is there and then totally removed 
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    });
};

dataInputEventListener();

const onSubmit = () => {
    const data = dataInput.value;
    if (!data.length) {
        return showInputError(); // retunr to not only show 
    }

    const color = mainColorPicker.value;
    const bgColor = backgroundColorPicker.value;
    const size = sizeSlider.value;
    const qZone = marginSlider.value;
    const format = imageFormat.value;

    // wrapper in {} to be sent as 1 obj.
    const parameters = prepareParameters({ data, color, bgColor, size, qZone, format });

    getQrCode(parameters);
};

const addSubmitEventListener = () => {
    submitButton.addEventListener('click', onSubmit);
};

addSubmitEventListener();

const editButton = document.querySelector('#edit');

const onEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultsContainer.classList.remove('flipped');
};

const addEditEventListener = () => {
    editButton.addEventListener('click', onEdit);
};

addEditEventListener();
