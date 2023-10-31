type Options = {
	sort?: {
		type: 'createDate' | 'updateDate' | 'sortOrder' | 'name' | 'level'
		order: 'asc' | 'desc'
	}
	expand?: 'all' | string[]
}

function getSortParam(sort: Options['sort']) {
	if (!sort) return ''

	return `&sort=${sort.type}:${sort.order}`
}

function getExpandParam(expand: Options['expand']): string {
	let expandParam = ''

	if (expand === 'all') {
		expandParam = '&expand=all'
	} else if (typeof expand === 'object') {
		expandParam = '?expand=property:'

		expand.forEach((item, index) => {
			expandParam += index === 0 ? item : `,${item}`
		})
	}

	return expandParam
}

// Client used to query our Umbraco CMS
function createClient({ domain }: { domain: string }) {
	const apiUrl = `${domain}/umbraco/delivery/api/v1/content`

	return {
		getContentById: async (id: string) => {
			const response = await fetch(`${apiUrl}/item/${id}`)
			const data = await response.json()

			return data
		},
		getContentByType: async (itemType: string, options?: Options) => {
			const { sort, expand } = options || {}

			// Example: http://localhost:20125/umbraco/delivery/api/v1/content?filter=contentType:blogPost&sort=createDate:desc&expand=property:content
			const response = await fetch(
				`${apiUrl}?filter=contentType:${itemType}${getSortParam(sort)}${getExpandParam(expand)}`
			)
			const data = await response.json()

			return data.items
		}
	}
}

export default createClient({ domain: import.meta.env.PUBLIC_BASE_URL })
