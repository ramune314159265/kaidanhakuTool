function replacementParser(data, replacements) {
	let chars = []

	for (const segment of data) {
		for (const char of segment.content) {
			chars.push({
				char,
				replacementHistory: [...segment.data]
			})
		}
	}

	for (const replacement of replacements) {
		const { from, to, ...metadata } = replacement
		let newChars = []
		let i = 0

		while (i < chars.length) {
			let match = true
			let matchChars = []

			for (let j = 0; j < from.length && i + j < chars.length; j++) {
				if (chars[i + j].char === from[j]) {
					matchChars.push(chars[i + j])
				} else {
					match = false
					break
				}
			}

			if (match && matchChars.length === from.length) {
				const history = matchChars[0].replacementHistory || []
				const newHistory = [
					...history,
					{ type: 'replacement', from, to, ...metadata }
				]

				for (const char of to) {
					newChars.push({
						char,
						replacementHistory: newHistory
					})
				}

				i += from.length
			} else {
				newChars.push(chars[i])
				i++
			}
		}

		chars = newChars
	}

	const result = []
	let currentGroup = null

	for (const charData of chars) {
		const historyKey = JSON.stringify(charData.replacementHistory)

		if (!currentGroup || currentGroup.historyKey !== historyKey) {
			if (currentGroup) {
				result.push({
					content: currentGroup.content,
					data: currentGroup.history
				})
			}
			currentGroup = {
				content: charData.char,
				history: charData.replacementHistory,
				historyKey
			}
		} else {
			currentGroup.content += charData.char
		}
	}

	if (currentGroup) {
		result.push({
			content: currentGroup.content,
			data: currentGroup.history
		})
	}

	return result
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
