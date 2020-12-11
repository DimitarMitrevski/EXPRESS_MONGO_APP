function clicked(val) {
    if (confirm('Дали сте сигурни дека сакате да го избришите постот?')) {
        fetch(`/posts/${val}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                document.location.href = '/posts';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}