export default class ApiService {

	private API_URL = "https://geocoding-api.open-meteo.com/v1/";

	public getSearchResults = async (searchText: string) => {
		const url = `${this.API_URL}search?name=${searchText}&count=5&language=en&format=json`;

		const response = await fetch(url);
		return await response.json();
	}

	/**
	 * Get the weekly weather for a given location
	 * @param lat
	 * @param lon
	 */
	public getWeeklyWeather = async (lat: number, lon: number) => {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`

		const response = await fetch(url);
		return await response.json();
	}

	/**
	 * Get the weather for today for a given location
	 * @param lat
	 * @param lon
	 */
	public getTodayWeather = async (lat: number, lon: number) => {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,wind_speed_10m&forecast_days=1`;

		const response = await fetch(url);
		return await response.json();
	}
}