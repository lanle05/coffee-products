interface CategoryFilterProps {
    categories: string[];
    selected: string;
    onChange: (cat: string) => void;
  }
  
const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onChange }) => {
    // const safeCategories = categories || [];
    return (
      
        <div className="bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
                {['All', ...categories].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onChange(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selected === cat
                            ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
  
  export default CategoryFilter;