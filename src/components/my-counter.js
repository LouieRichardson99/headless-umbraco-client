import { LitElement, html, css } from 'lit'

export class MyCounter extends LitElement {
	static properties = {
		count: { type: Number }
	}

	constructor() {
		super()
		this.count = 0
	}

	render() {
		return html`
			<div>
				<p>Click count: ${this.count}</p>
				<button @click="${this._increment}">Click Me!</button>
			</div>
		`
	}

	_increment(e) {
		this.count++
	}

	static styles = css`
		div {
			padding: 2rem;
			border: 2px solid #ed288a;
		}

		p {
			margin: 0 0 1rem;
		}

		button {
			background-color: #fff;
			border: 1px solid #ccc;
			border-radius: 4px;
			cursor: pointer;
			font-size: 16px;
			padding: 6px 12px;
		}
	`
}
customElements.define('my-counter', MyCounter)
