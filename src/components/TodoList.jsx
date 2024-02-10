import PropTypes from "prop-types";

export default function TodoList({children, title}) {
    return (
        <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
            </h2>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 space-y-2 text-gray-700 list-inside dark:text-gray-400">
                {children}
            </ul>
        </div>
    )
}

TodoList.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
}
