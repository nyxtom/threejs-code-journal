document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    
    const exercises = [
        // List of exercises (this should be dynamically generated)
        { date: '2025-02-11', name: 'exercise-1', path: 'exercises/2025/02/11/exercise-1/index.html' },
        { date: '2025-02-11', name: 'exercise-2', path: 'exercises/2025/02/11/exercise-2/index.html' },
        { date: '2025-02-11', name: 'exercise-3', path: 'exercises/2025/02/11/exercise-3/index.html' }
    ];

    exercises.forEach(exercise => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 p-4 rounded-lg shadow-lg mb-4';

        const title = document.createElement('h2');
        title.className = 'text-md font-bold mb-2';
        title.textContent = `${exercise.date} - ${exercise.name}`;

        const iframe = document.createElement('iframe');
        iframe.src = exercise.path;
        iframe.className = 'w-full h-64 mb-2 rounded';
        iframe.style.border = 'none';

        const link = document.createElement('a');
        link.href = exercise.path;
        link.target = '_blank';
        link.className = 'text-blue-400 hover:underline text-xs';
        link.textContent = 'View Exercise in Fullscreen';

        card.appendChild(title);
        card.appendChild(iframe);
        card.appendChild(link);
        gallery.appendChild(card);
    });
});
