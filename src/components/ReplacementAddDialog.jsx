import {
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Field as SimpleField } from "@/components/ui/field"
import {
	NumberInputField,
	NumberInputRoot
} from "@/components/ui/number-input"
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText
} from "@/components/ui/select"
import { AlertContent, AlertDescription, AlertIndicator, AlertRoot, AlertTitle, Button, createListCollection, FieldLabel, FieldRoot, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'
import { jobs } from '../utils/jobs'

export const ReplacementAddDialog = ({ children }) => {
	const [open, setOpen] = useState(false)
	const contentRef = useRef(null)
	const [players, { editPlayer }] = usePlayers()
	const [replacements, { addReplacement }] = useReplacements()
	const playersCollection = createListCollection({
		items: Object.values(players).map(player => {
			return {
				label: player.hp <= 0 ? `${player.name} (ゲームオーバー)` : player.name,
				value: player.uuid,
				isDead: player.hp <= 0
			}
		})
	})
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		setValue,
		reset,
		formState: {
			errors
		},
		control
	} = useForm({
		defaultValues: {
			player: [playersCollection.items[0]?.value]
		}
	})
	const onSubmit = data => {
		const playerData = players[data.player[0]]
		if (data.rollValue !== playerData.rollValue || jobs[playerData.jobId].ignoreFailed) {
			addReplacement({ from: data.replaceBefore, to: data.replaceAfter, playerId: data.player[0] })
		}
		if (data.rollValue === playerData.rollValue) {
			editPlayer(data.player, { hp: playerData.hp - 1 })
		}
		setOpen(false)
		reset()
	}
	return (
		<DialogRoot open={open} lazyMount onOpenChange={e => setOpen(e.open)} closeOnInteractOutside={false}>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent ref={contentRef}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>置き換えを追加</DialogTitle>
					</DialogHeader>
					<DialogBody>

						<VStack gap="4">
							<SimpleField
								label="プレイヤー"
								invalid={!!errors.player}
								errorText={errors.player?.message}
							>
								<Controller
									control={control}
									name="player"
									render={({ field }) => (
										<SelectRoot
											name={field.name}
											value={field.value}
											onValueChange={({ value }) => field.onChange(value)}
											onInteractOutside={() => field.onBlur()}
											collection={playersCollection}
											size="sm"
											defaultOpen
										>
											<SelectTrigger>
												<SelectValueText placeholder="プレイヤーを選択" />
											</SelectTrigger>
											<SelectContent portalRef={contentRef}>
												{playersCollection.items.map((p) => (
													<SelectItem item={p.value} key={p.value}>
														<Text color={p.isDead ? 'fg.muted' : null}>{p.label}</Text>
													</SelectItem>
												))}
											</SelectContent>
										</SelectRoot>
									)}
								/>
							</SimpleField>

							<SimpleField
								label="ダイス出目"
								invalid={!!errors.rollValue}
								errorText={errors.rollValue?.message}
							>
								<Controller
									name="rollValue"
									control={control}
									render={({ field }) => (
										<NumberInputRoot
											disabled={field.disabled}
											name={field.name}
											value={field.value}
											onValueChange={({ value }) => {
												field.onChange(value)
											}}
											min={1}
											max={6}
											allowOverflow={false}
										>
											<NumberInputField onBlur={field.onBlur} />
										</NumberInputRoot>
									)}
								/>
							</SimpleField>

							<HStack w="full">
								<FieldRoot>
									<FieldLabel>置き換え前</FieldLabel>
									<Input
										size="sm"
										{...register('replaceBefore', {
											required: '入力必須です'
										})}
										onPaste={e => {
											if (getValues().replaceBefore || getValues().replaceAfter) {
												return
											}
											e.preventDefault()
											const text = e.clipboardData.getData('text').trim()
											const splitterRegExp = new RegExp('(\\n|→|=|　|＝)')
											const [first, , ...after] = text.split(splitterRegExp).filter(s => s !== '')
											setValue('replaceBefore', first.trim())
											setValue('replaceAfter', after.join('').trim())
										}}
									></Input>
								</FieldRoot>

								<FieldRoot>
									<FieldLabel>置き換え後</FieldLabel>
									<Input size="sm" {...register('replaceAfter', {
										required: '入力必須です'
									})}></Input>
								</FieldRoot>
							</HStack>

							{
								watch('player')[0]
									? <AlertRoot>
										<AlertIndicator></AlertIndicator>
										<AlertContent>
											<AlertTitle>{players[watch('player')].name}の役職({jobs[players[watch('player')].jobId].name})の効果</AlertTitle>
											<AlertDescription>{jobs[players[watch('player')].jobId].description}</AlertDescription>
										</AlertContent>
									</AlertRoot>
									: <></>
							}
						</VStack>

					</DialogBody>
					<DialogFooter>
						<DialogActionTrigger asChild>
							<Button variant="outline">キャンセル</Button>
						</DialogActionTrigger>
						<Button type="submit">置き換える</Button>
					</DialogFooter>
					<DialogCloseTrigger />
				</form >
			</DialogContent>
		</DialogRoot >
	)
}
