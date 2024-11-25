export const context = {};

export function close() {
  if (!context.modal) {
    return;
  }

  context.modal.style.display = "none";
  context.modal.querySelector(".alwin-x-modal-body").innerHTML = "";
  document.removeEventListener("click", handleClickOutsideModalContent);
}

function handleClickOutsideModalContent(event) {
  const modalContent = document.querySelector(".alwin-x-modal-content");
  if (!modalContent) {
    return;
  }

  if (!modalContent.contains(event.target)) {
    close();
  }
}

export function render() {
  if (context.modal) {
    return;
  }

  context.modal = document.createElement("div");
  context.modal.className = "alwin-x-modal";
  context.modal.innerHTML = `
	<div class="alwin-x-modal-content">	
		<div class="alwin-x-modal-header">
			<h2>ArXiv Search Result</h2>
			<span class="alwin-x-close">&times;</span>
		</div>
		<div class="alwin-x-modal-body">
		</div>
	</div>
	`;
  context.modal.style.display = "none";

  document.body.appendChild(context.modal);
  document.querySelector(".alwin-x-close").addEventListener("click", close);
}

export function show() {
  if (!context.modal) {
    return;
  }

  context.modal.style.display = "block";
  document.addEventListener("click", handleClickOutsideModalContent);
}

export function renderItem(item) {
  if (!context.modal) {
    return;
  }

  const div = document.createElement("div");
  div.className = "alwin-x-modal-item";
  div.innerHTML = `
		<h3 class="alwin-x-arxiv-title">
			<a href="${item.link}" target="_blank" style="text-decoration: none">
				${item.title}
			</a>
		</h3>
		<p class="alwin-x-arxiv-author">
			${item.author}
		</p>
		<p class="alwin-x-arxiv-published-date">
			${new Date(item.published).toDateString()}
		</p>

		<div class="alwin-x-arxiv-abstract">
			${item.summary}
		</div>
	`;
  context.modal.querySelector(".alwin-x-modal-body").appendChild(div);
}

export default {
  render,
  context,
  close,
  show,
  renderItem,
};
