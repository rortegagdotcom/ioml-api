import app from './app';

app.listen(app.get('post'), () => {
    console.log('Server on port', app.get('port'));
});