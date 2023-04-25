export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']{
        _id,
        userName,
        authType,
        imageUrl
    }`;
    return query;
  };

  export const categoryQuery = (userId) => {
    const query = `*[_type == "category" && user._ref == '${userId}'] | order(name asc) {
        _id,
        _type,
        color,
        name,
        icon->{
            _id,
            name,
            image
        },
        user->{
            _id
        }
    }`;
    return query;
  };

  export const systemCategoryQuery = (userId) => {
    const query = `*[_type == "category" && user._ref == '${process.env.REACT_APP_SANITY_SYSTEM_USER_ID}'] | order(name asc) {
        _id,
        _type,
        color,
        name,
        icon->{
            _id,
            name,
            image
        },
        user->{
            _id
        }
    }`;
    return query;
  };

  export const taskTypeQuery = (userId) => {
    const query = `*[_type == "taskType" && user._ref == '${userId}'] | order(name asc) {
      _id,
      _type,
      unit,
      name,
      category->{
        _id,
        color
      },
      icon->{
        _id,
        name,
        image
      },
      user->{
          _id
      }
    }`;
    return query;
  };

  export const taskQuery = (userId) => {
    const query = `*[_type == "task" && (user._ref == '${userId}')] | order(date asc) {
        _id,
        date,
        amount,
        notes,
        taskType->{
          _id,
          unit,
          name,
          category->{
            _id,
            color
          },
          icon->{
            _id,
            name,
            image
          },
        },
        user->{
            _id
        }
    }`;
    return query;
  };

  export const iconQuery = () => {
    return '*[_type == "iconImage"]';
  }