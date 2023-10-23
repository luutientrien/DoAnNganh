import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
	Paper,
	Table,
	TableCell,
	TableBody,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Button,
} from '@material-ui/core';
import { useStyles } from './AppTable-style';
import moment from "moment";
import DeleteIcon from '@material-ui/icons/Delete';
import { ProtectRoutes } from '../../routes/protect-route';
import { useHistory } from 'react-router';

const StyledTableCell = withStyles((theme) => ({
	head: {
		// backgroundColor: theme.palette.common.black,
		backgroundColor: "#0081ff",
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

export default function AppTable({
	columns = [],
	data = [],
	handleChooseItem = () => { },
	isPagination = true,
	isBtn = true,
	fillCategory = [],
	paramsChoose = {},
	handleDelete = () => { }
}) {
	const classes = useStyles();
	const history = useHistory();

	// chuyển trang
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const formatDataCol = (formatType, data) => {
		if (formatType === 'date') {
			return moment(data).format("DD-MM-YYYY").toString()
		}
		if (formatType === 'gen') {
			return data === 'm' ? 'Nam' : 'Nữ'
		}
		if (formatType === 'status') {
			if (data === 'forgot_password') return 'Quên mật khẩu';
			if (data === 'reset_password') return 'Chờ đăng nhập';
			return 'Hoạt động';
		}
		if (formatType === 'validation') {
			if (data === '1') return 'Hoạt động';
			return 'Đã ẩn';
		}
		if (formatType === 'price') {
			return `${data} VNĐ`;
		}
		return data
	}

	const handleChoose = (rowData, params) => {
		const { keyId, _path } = params;
		const getId = rowData[`${keyId}`];
		const _pathPage = ProtectRoutes[`${_path}`].path.replace(":id", getId)
		history.push(_pathPage, {
			id: getId
		})
	}

	return (
		<Paper className={classes.root}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table" className={classes.AppTable1}>
					<TableHead >
						<TableRow>
							<StyledTableCell
								style={{
									minWidth: 70,
									maxWidth: 70,
									width: 70
								}}
							>STT</StyledTableCell>
							{columns.map((column) => (
								<StyledTableCell
									key={column.id}
									align={column.align ? column.align : 'center'}
									style={{
										minWidth: column.width,
										maxWidth: column.width,
										width: column.width
									}}
								>
									{column.name}
								</StyledTableCell>
							))}
							{isBtn ? <StyledTableCell
								style={{
									minWidth: 100,
									maxWidth: 100,
									width: 100
								}}
							>Chức năng</StyledTableCell> : <></>}
						</TableRow>
					</TableHead>
					<TableBody >
						{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idxR) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={`${idxR}-row-table`} id={`table-${idxR}-data-row-${row.created_note}`}>
									<StyledTableCell
										align='center'
										style={{
											minWidth: 70,
											maxWidth: 70,
											width: 70
										}}
									>{idxR + 1}</StyledTableCell>
									{columns.map((column, idx) => {
										const value = row[column.id];
										return (
											<StyledTableCell
												key={column.id}
												align={column.align ? column.align : 'left'}
												// onClick={handleChooseItem ? () => handleChooseItem(row) : () => handleChoose(row, paramsChoose)}
												onClick={Object.keys(paramsChoose).length > 0 ? () => handleChoose(row, paramsChoose) : () => handleChooseItem(row, `table-${idxR}-data-row-${row.created_note}`)}
												style={{
													minWidth: column.width,
													maxWidth: column.width,
													width: column.width
												}}
											>
												{formatDataCol(column.format, value)}
											</StyledTableCell>
										);
									})}
									{isBtn ? <StyledTableCell
										align='center'
										style={{
											minWidth: 100,
											maxWidth: 100,
											width: 100
										}}
									>
										<Button fullWidth onClick={() => handleDelete(row)}>
											<DeleteIcon />
										</Button>
									</StyledTableCell> : <></>}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>

			{isPagination ? <>
				<TablePagination
					// rowsPerPageOptions={[1, 2, 3]}
					rowsPerPageOptions={[5, 10, 20]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</> : <></>}
		</Paper>
	);
}
