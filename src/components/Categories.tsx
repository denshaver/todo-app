import { FC, FormEvent, useState, useRef, useEffect } from "react";
import { Plus, ThreeLineHorizontal, Cross } from "akar-icons";
import { useCategories } from "../state/TodoAppProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Category } from "../interfaces";
import { nanoid } from "nanoid";

const Categories: FC = () => {
  // States
  const [addMode, setAddMode] = useState<boolean>(false);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [categoriesState, categoriesDispatch] = useCategories();
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(true);
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Router
  const categoryId = useParams().categoryId;
  const navigate = useNavigate();

  // Functions
  const handleCategoryInputChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 10) {
      return;
    }
    setCategoryInput(event.currentTarget.value);
  };

  const handleCategoryAdd = (event: FormEvent) => {
    event.preventDefault();
    if (!categoryInput) {
      return;
    }
    const newCategory: Category = {
      name: categoryInput,
      id: nanoid(),
      color: "#909090",
    };
    categoriesDispatch({ type: "addCategory", payload: newCategory });
    setCategoryInput("");
    setAddMode(false);
    navigate(`/${newCategory.id}`);
    setMenuIsOpened(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [addMode]);

  // Outise click event

  const handleOutsideClick = (event: MouseEvent) => {
    if (!formRef.current?.contains(event.target as Node)) {
      setAddMode(false);
      setCategoryInput("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  // Render
  return (
    <>
      {menuIsOpened && <div className="menu-overlay"></div>}
      {!menuIsOpened && (
        <ThreeLineHorizontal
          strokeWidth={1}
          size={30}
          className="menu-burger"
          onClick={() => setMenuIsOpened(true)}
        />
      )}
      <aside className={menuIsOpened ? "open" : ""}>
        <Cross
          strokeWidth={1}
          size={26}
          className="menu-cross"
          onClick={() => setMenuIsOpened(false)}
        />
        <div className="categories">
          <h2
            onClick={() => {
              navigate("/");
              setMenuIsOpened(false);
            }}
            className={!categoryId ? "choosen" : ""}
            key={"0001"}
          >
            All tasks
          </h2>
          {categoriesState.map((category) => {
            return (
              <h2
                className={categoryId === category.id ? "choosen" : ""}
                onClick={() => {
                  navigate(`/${category.id}`);
                  setMenuIsOpened(false);
                }}
                key={category.id}
              >
                {category.name}
              </h2>
            );
          })}
        </div>
        <div className="categories-add">
          {!addMode ? (
            <span
              onClick={() => {
                setAddMode(true);
              }}
            >
              + New category
            </span>
          ) : (
            <form
              className="categories-form"
              onSubmit={handleCategoryAdd}
              ref={formRef}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter name"
                value={categoryInput}
                onChange={handleCategoryInputChange}
              />
              <button className="center">
                <Plus strokeWidth={3} size={16} color="white" />
              </button>
            </form>
          )}
        </div>
      </aside>
    </>
  );
};

export default Categories;
