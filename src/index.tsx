import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';

const getTGScript = () => {
	try {
		const script = document.createElement('script');
		script.src = 'https://telegram.org/js/telegram-web-app.js';
		script.async = true;
		document.body.appendChild(script);
	} catch (e) {
		console.log(e);
	}
};

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

getTGScript();
