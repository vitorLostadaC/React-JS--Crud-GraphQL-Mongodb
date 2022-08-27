import styled from "styled-components";

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: var(--modalBackground);
  padding: 1rem;
  min-width: 300px;
  border-radius: 8px;

  h2 {
    padding: 0 0 1rem 0;
    border-bottom: 1px solid;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    justify-content: center;
    align: center;
    flex-direction: column;
    gap: 1rem;

    .box {
      display: flex;
      justify-content: center;
      align: center;
      flex-direction: column;
      gap: 0.2rem;

      input {
        padding: 0.2rem 0.2rem;
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;

      button {
        padding: 0.4rem 0.7rem;
        border: none;
        border-radius: 0.25rem;
        transition: filter 0.2s ease-in-out;

        &:first-child {
          background: #6e7881;
          color: var(--white);
        }
        &:last-child {
          background: var(--details);
          color: var(--white);
        }

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
`;
