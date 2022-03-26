export const Search = ({search}) => {



	return (
		<div className="search">
			<input type="text" className="search__input" placeholder="Buscar manga..." onChange={search}/>
		</div>
	);
};
