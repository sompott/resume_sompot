// ----
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio items data
    const portfolioItems = [
        // Page 1 items
        {
            category: 'experience',
            imageSrc: "static/images/gr.jpeg",
            images: [
                "static/images/gr11.jpeg",
                "static/images/groven1.jpeg",
                "static/images/groven.jpeg "
            ],
            title: "Smoking Temperature Control Report",
            description: "Temperature Report for Analyzing the Optimal Conditions of the Rubber Drying Oven",
            tags: ["Flask", "React", "Node-red"]
        },
        {
            category: 'experience',
            imageSrc: "static/images/ttn.jpeg",
            images: [
                "static/images/ttn11.jpeg",
                "static/images/oven_ttn1.jpeg",
                "static/images/oven_ttn.jpeg"
            ],
            title: "Smoking Temperature Control Report",
            description: "Temperature Report for Analyzing the Optimal Conditions of the Rubber Drying Oven",
            tags: ["Flask", "React", "Node-red"]
        },
        {
            category: 'experience',
            imageSrc: "static/images/eudr.jpeg",
            images: [
                 "static/images/eudr.jpeg"
            ],
            title: "EUDR system",
            description: "A system designed to record rubber plantation farmers' data and generate PDF files ",
            tags: ["Flask", "HTML CSS Bootstrap"],
            customClass: "custom-image_eudr"
        },
        {
            category: 'experience',
            imageSrc: "static/images/notify.png",
            images: [
                "static/images/notify5.jpg",
                "static/images/notify2.jpg",
                "static/images/notify4.jpg"
            ],
            title: "Line messaging api notify",
            description: "Line API notification system for temperature and humidity alerts ",
            tags: ["Line messaging api", "Node-red"],
            customClass: "custom-image1"
        },
        {
            category: 'experience',
            imageSrc: "static/images/watch5.jpg",
            images: [
                "static/images/watch5.jpg",
                "static/images/watch1.jpg",
                "static/images/watch8.jpg"
            ],
            title: "Elderly detection system with a watch",
            description: "Complete brand identity development for an innovative tech startup.",
            tags: ["Hardware Tester"]
        },
        {
            category: 'experience',
            imageSrc: "static/images/2.jpg",
            images: [
                "static/images/weight.PNG",
                "static/images/weight1.PNG",
            ],
            title: "Rubber Weighing System",
            description: "A system for recording daily rubber block weights and generating summary reports",
            tags: ["Node-red", "Python",],
            customClass: "custom-image"
        },
        // Page 2 items - Add your new projects here
        {
            category: 'graduation',
            imageSrc: "static/images/npk.jpeg",
            images: [
                "static/images/npk1.jpeg",
            ],
            title: "Soil Mineral Value (NPK) Analysis",
            description: "Research study on npk measurement using image processing",
            tags: ["image processing"],
            customClass: "custom-image_eudr"
        },
        {
            category: 'iot',
            imageSrc:  "static/images/iot1.jpg",
            images: [
                "static/images/iot2.jpg",
                "static/images/iot11.jpg",
            ],
            title: "Automatic Composting System",
            description: "IoT solution for monitoring and managing composting processes.",
            tags: ["Arduino", "Apps Script"],
            customClass: "custom-image"
        },
        {
            category: 'intern',
            imageSrc: "static/images/elerning.jpeg",
            images: [
                "static/images/elerning.jpeg",
            ],
            title: "E-learning System",
            description: "A system for studying the use of online applications with e-learning systems",
            tags: ["Django", "HTML CSS Bootstrap"],
            customClass: "custom-image_eudr"
        },
        {
            category: 'intern',
            imageSrc:  "static/images/ebook.jpeg",
            images: [
                "static/images/ebook1.jpeg",
                "static/images/ebook2.PNG",
            ],
            title: "E-book",
            description: "A system for reading books online using an e-book system",
            tags: ["Django", "HTML CSS Bootstrap"],
            customClass: "custom-image"
        },
        // Add more items as needed
    ];

    const itemsPerPage = 6;
let currentPage = 1;
let currentFilter = 'all';

renderPortfolioItems();
updatePaginationState();

// Filter click event
document.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.filter-item').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.getAttribute('data-filter');
        currentPage = 1;
        updatePaginationState();
        renderPortfolioItems();
    });
});

document.getElementById('prev-page').addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        updatePaginationState();
        renderPortfolioItems();
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

document.getElementById('next-page').addEventListener('click', function (e) {
    e.preventDefault();
    const totalPages = Math.ceil(getFilteredItems().length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updatePaginationState();
        renderPortfolioItems();
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

document.addEventListener('click', function (e) {
if (e.target.closest('.image-popup')) {
    e.preventDefault();
    const images = JSON.parse(e.target.closest('.image-popup').getAttribute('data-images'));
    const carouselInner = document.getElementById('carousel-inner');
    carouselInner.innerHTML = '';

    images.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        div.innerHTML = `<img src="${src}" class="d-block w-100" alt="Slide ${index + 1}">`;
        carouselInner.appendChild(div);
    });

    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
}
});


function getFilteredItems() {
    return currentFilter === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === currentFilter);
}

function renderPortfolioItems() {
    const container = document.getElementById('portfolio-items-container');
    container.innerHTML = '';

    const filteredItems = getFilteredItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const itemsToDisplay = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    if (itemsToDisplay.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><p>No projects found in this category.</p></div>';
        return;
    }

    itemsToDisplay.forEach(item => {
        const imgClass = item.customClass || '';
        const imageData = JSON.stringify(item.images || [item.imageSrc]);

        const itemElement = document.createElement('div');
        itemElement.className = 'col-lg-4 col-md-6 portfolio-col';
        itemElement.setAttribute('data-category', item.category);

        itemElement.innerHTML = `
            <div class="portfolio-item">
                <div class="portfolio-img">
                    <img src="${item.imageSrc}" alt="${item.title}" class="${imgClass}">
                    <div class="portfolio-overlay">
                        <a href="#" class="image-popup" data-images='${imageData}'><i class="fas fa-search"></i></a>
                    </div>
                </div>
                <div class="portfolio-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="portfolio-tags">
                        ${item.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(itemElement);
    });
}

function updatePaginationState() {
    const filteredItems = getFilteredItems();
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginationList = document.querySelector('.pagination');
    const nextPageItem = document.getElementById('next-page');

    document.querySelectorAll('.page-item:not(#prev-page):not(#next-page)').forEach(item => item.remove());

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;

        li.querySelector('a').addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = i;
            updatePaginationState();
            renderPortfolioItems();
            document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        paginationList.insertBefore(li, nextPageItem);
    }

    const prevPageItem = document.getElementById('prev-page');
    prevPageItem.classList.toggle('disabled', currentPage === 1);
    prevPageItem.querySelector('a').setAttribute('aria-disabled', currentPage === 1 ? 'true' : 'false');

    nextPageItem.classList.toggle('disabled', currentPage === totalPages || totalPages === 0);
    nextPageItem.querySelector('a').setAttribute('aria-disabled', (currentPage === totalPages || totalPages === 0) ? 'true' : 'false');
}
});