document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    
    const exercises = [
        // List of exercises (this should be dynamically generated)
        { date: '2025-02-11', name: 'exercise-1', path: 'exercises/2025/02/11/exercise-1/index.html' }
    ];

    exercises.forEach(exercise => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 p-4 rounded-lg shadow-lg';
        
        const title = document.createElement('h2');
        title.className = 'text-xl font-bold mb-2';
        title.textContent = `${exercise.date} - ${exercise.name}`;
        
        const link = document.createElement('a');
        link.href = exercise.path;
        link.target = '_blank';
        link.className = 'text-blue-400 hover:underline';
        link.textContent = 'View Exercise';

        card.appendChild(title);
        card.appendChild(link);
        gallery.appendChild(card);
    });
});
