import React from "react";
import {
	Box, TextField, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, Grid, Button
} from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { useStyles } from './AppSearch-style';
import AppInput from '../AppInput/AppInput'

export default function AppSearch({
	fields = [],
	control,
	className,
	onSearch = () => { },
	onCreateNew = () => { },
}) {
	const classes = useStyles();
	// xử lý nút enter khi tìm
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			onSearch();
		}
	};

	const RenderTextField = ({ field, control }) => {
		return field?.component?.textField && (
			<Controller
				control={control}
				name={field.id}
				defaultValue=""
				render={({ field: { onChange, value } }) => {
					return (
						<FormControl component="fieldset" className='form-input'>
							<TextField
								id={field.id}
								// control={control}
								value={value}
								onChange={onChange}
								label={field.label}
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
								onKeyDown={handleKeyDown}
							/>
						</FormControl>
					)
				}}
			/>
		)
	}

	return (
		<Box className={[classes.AppSearch, className].join(' ')}>
			<Box className='row-search'>
				{fields.map((field, idx) => {
					let _xs = field?.xs ? field.xs : 3;
					return (
						<Box className='row-input' key={`app-search-${idx}-box`}>
							<RenderTextField field={field} control={control} />
						</Box>
					)
				})}
				<Box >
					<Button className='btn-search' onClick={onSearch}>Tìm kiếm</Button>
				</Box>
			</Box>
			<Box >
				<Button className='btn-search' onClick={onCreateNew}>Tạo mới</Button>
			</Box>
		</Box>
	);

};