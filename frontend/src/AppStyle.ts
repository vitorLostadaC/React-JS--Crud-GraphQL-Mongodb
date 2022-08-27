import styled, { css } from "styled-components";

type ItemProps = {
  isAddCard?: boolean;
};

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 2rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Item = styled.div<ItemProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
  user-select: none;

  ${(props) =>
    props.isAddCard &&
    css`
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      svg {
        color: var(--details);
      }
      &:hover {
        cursor: pointer;
        svg {
          background-color: var(--details);
          color: var(--text);
          border-radius: 50%;
        }
        p {
          color: var(--details);
        }
      }
    `}

  p {
    color: var(--text);
  }

  & + div {
    border-top: 1px solid var(--itemSeparator);
  }

  .sub-title {
    font-size: 0.9rem;
    color: var(--details);
  }

  .icons {
    display: none;
    gap: 1rem;
    color: var(--details);
    svg {
      cursor: pointer;
      &:hover {
        color: var(--text);
      }
    }
  }

  &:hover .icons {
    display: flex;
  }
`;
