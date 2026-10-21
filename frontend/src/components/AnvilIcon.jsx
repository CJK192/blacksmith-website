// simple anvil drawing (svg), the cart shows this if an item doesnt have a picture
function AnvilIcon()
{
    return <svg viewBox="0 0 100 80" fill="none">
        <path d="M15 24h70v12L66 49H43L28 36H15V24Z" />
        <path d="M46 49v12H35v8h39v-8H62V49M68 24V14H42v10" />
    </svg>
}

export default AnvilIcon;
