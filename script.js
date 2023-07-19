'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const projectsData = [
    {
      title: 'Интернет-магазин Different Store',
      description: 'Интернет-магазин Different Store на html, scss с tailwindcss и ts c angular. (ссылка на репозиторий github)',
      link: 'https://github.com/startsevd6/different-store/',
      image: 'different-store',
      date: '26.06.2023 - 28.06.2023',
      altTextImage: 'сайта Different Store'
    },
    {
      title: 'Сайт для изучения python',
      description: 'Сайт на html, css и js, на котором пользователь может изучить язык программирования Python',
      link: 'learn-python',
      image: 'learn-python',
      date: '10.05.2023 - н.в.',
      altTextImage: 'сайта для изучения python'
    },
    {
      title: 'Лендинг Procrastinate.',
      description: 'Лендинг Procrastinate. на html, css и js',
      link: 'procrastinate',
      image: 'procrastinate',
      date: '09.09.2022',
      altTextImage: 'лендинга Procrastinate.'
    },
    {
      title: 'Лендинг web-студии aloha',
      description: 'Лендинг web-студии aloha на html, css и js',
      link: 'aloha',
      image: 'aloha',
      date: '29.08.2022',
      altTextImage: 'лендинга web-студии aloha'
    }
  ];
  const projects = document.getElementsByClassName('wrapper-projects')[0];
  projectsData.forEach((project) => {
    const projectElement = document.createElement('a');
    projectElement.href = project.link;
    projectElement.target = '_blank';
    projectElement.rel = 'noopener noreferrer';
    projectElement.classList.add('project');

    const projectContent = `
      <div class="project-a">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <h2>${project.date}</h2>
      </div>
      <div class="project-img">
        <img src="img/project-${project.image}.png" alt="Скриншот главной страницы ${project.altTextImage}">
      </div>
    `;
    projectElement.innerHTML = projectContent;
    projects.appendChild(projectElement);
  });
});
