const replacementParser = (data, replacements) => {
	return replacements.reduce((dataList, replacement) => {
		return dataList.flatMap(data => {
			return data.content
				.split(new RegExp(`(${replacement.from})`))
				.filter(e => e !== '')
				.map(e => {
					return e === replacement.from
						? {
							content: replacement.to,
							data: [
								...data.data,
								{
									type: 'replacement',
									...replacement
								}
							]
						} : {
							content: e,
							data: data.data
						}
				})
		})
	}, data)
}

const keywordParser = (data, keywords) => {
	return keywords.reduce((dataList, keyword) => {
		return dataList.flatMap(data => {
			return data.content
				.split(new RegExp(`(${keyword})`))
				.filter(e => e !== '')
				.map(e => {
					return e === keyword
						? {
							content: e,
							data: [
								...data.data,
								{
									type: 'keyword',
									keyword: e
								}
							]
						} : {
							content: e,
							data: data.data
						}
				})
		})
	}, data)
}

export const parseSentence = (content, { replacements, keywords }) => {
	const data = [{ content, data: [] }]
	const replacementParsed = replacementParser(data, replacements)
	const keywordsParsed = keywordParser(replacementParsed, keywords)
	return keywordsParsed
}
