<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Probar Microservicio: Create Post</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      background-color: #f4f4f9;
    }
    form {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      margin: 0 auto;
    }
    input, select, textarea, button {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button {
      background-color: #007BFF;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .response {
      margin-top: 20px;
      padding: 15px;
      background: #e7f3e7;
      border: 1px solid #8bc98b;
      border-radius: 5px;
      color: #256029;
    }
    .error {
      background: #f9d6d5;
      border: 1px solid #e99b9b;
      color: #721c24;
    }
  </style>
</head>
<body>
  <h1>Probar Microservicio: Create Post</h1>
  <form id="createPostForm">
    <label for="extract">Extracto:</label>
    <input type="text" id="extract" name="extract" placeholder="Extracto breve" required />

    <label for="content">Contenido:</label>
    <textarea id="content" name="content" rows="5" placeholder="Contenido de la publicación" required></textarea>

    <label for="type">Tipo:</label>
    <select id="type" name="type" required>
      <option value="TEXTO">TEXTO</option>
      <option value="MEDIA">MEDIA</option>
      <option value="GRUPO">GRUPO</option>
    </select>

    <label for="privacy">Privacidad:</label>
    <select id="privacy" name="privacy" required>
      <option value="Pública">Pública</option>
      <option value="Solo yo">Solo yo</option>
      <option value="Amigos">Amigos</option>
    </select>

    <button type="submit">Crear Publicación</button>
  </form>

  <div id="response" class="response" style="display: none;"></div>

  <script>
    const form = document.getElementById('createPostForm');
    const responseDiv = document.getElementById('response');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Obtener los datos del formulario
      const extract = document.getElementById('extract').value;
      const content = document.getElementById('content').value;
      const type = document.getElementById('type').value;
      const privacy = document.getElementById('privacy').value;

      // Token de autenticación (reemplazar con uno válido)
      const token = 'tu-token-aquí';

      // Crear el cuerpo de la solicitud
      const postData = { extract, content, type, privacy };

      try {
        const response = await fetch('http://localhost:4201/api/createPost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Requiere autenticación
          },
          body: JSON.stringify(postData),
        });

        const result = await response.json();

        if (response.ok) {
          responseDiv.className = 'response';
          responseDiv.textContent = 'Publicación creada exitosamente: ' + JSON.stringify(result.data);
        } else {
          responseDiv.className = 'response error';
          responseDiv.textContent = 'Error: ' + JSON.stringify(result.message || result);
        }
      } catch (error) {
        responseDiv.className = 'response error';
        responseDiv.textContent = 'Error de conexión: ' + error.message;
      }

      responseDiv.style.display = 'block';
    });
  </script>
</body>
</html>
